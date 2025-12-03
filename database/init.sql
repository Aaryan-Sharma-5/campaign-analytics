-- Create campaigns table
CREATE TABLE IF NOT EXISTS campaigns (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('Active', 'Paused')),
    clicks INTEGER NOT NULL DEFAULT 0,
    cost DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    impressions INTEGER NOT NULL DEFAULT 0
);

-- Insert 10 sample campaigns
INSERT INTO campaigns (name, status, clicks, cost, impressions) VALUES
('Summer Sale', 'Active', 150, 45.99, 1000),
('Black Friday', 'Paused', 320, 89.50, 2500),
('Holiday Special', 'Active', 275, 120.00, 1800),
('New Year Promo', 'Active', 180, 55.25, 1200),
('Spring Collection', 'Paused', 95, 30.00, 600),
('Flash Sale', 'Active', 420, 150.75, 3000),
('Clearance Event', 'Paused', 65, 22.50, 450),
('Back to School', 'Active', 210, 78.00, 1500),
('Weekend Deals', 'Active', 135, 42.00, 900),
('VIP Members Only', 'Paused', 88, 35.00, 550);
