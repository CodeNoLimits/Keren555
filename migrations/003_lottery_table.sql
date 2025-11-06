-- Lottery Entries Table for Uman Raffle
CREATE TABLE IF NOT EXISTS lottery_entries (
  id SERIAL PRIMARY KEY,
  order_id VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  amount DECIMAL(10, 2) NOT NULL,
  num_entries INTEGER DEFAULT 1,
  status VARCHAR(50) DEFAULT 'pending',
  payment_method VARCHAR(50) DEFAULT 'paypal',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Indexes for faster queries
  INDEX idx_email (email),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
);

-- Function to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to call the function
CREATE TRIGGER update_lottery_entries_updated_at
  BEFORE UPDATE ON lottery_entries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- View for lottery statistics
CREATE OR REPLACE VIEW lottery_stats AS
SELECT
  COUNT(*) as total_entries,
  SUM(num_entries) as total_tickets,
  SUM(amount) as total_raised,
  COUNT(DISTINCT email) as unique_participants,
  AVG(amount) as average_donation
FROM lottery_entries
WHERE status = 'completed';
