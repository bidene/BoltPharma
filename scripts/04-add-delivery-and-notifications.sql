-- Ajouter les colonnes de livraison à la table orders
ALTER TABLE orders
ADD COLUMN delivery_id VARCHAR(100),
ADD COLUMN delivery_tracking_url VARCHAR(255),
ADD COLUMN delivery_status ENUM('pending', 'assigned', 'picked_up', 'in_transit', 'delivered', 'cancelled') DEFAULT 'pending',
ADD COLUMN delivery_name VARCHAR(100),
ADD COLUMN delivery_phone VARCHAR(20),
ADD COLUMN delivery_address TEXT,
ADD COLUMN delivery_city VARCHAR(100);

-- Créer la table des notifications
CREATE TABLE IF NOT EXISTS notifications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  user_type ENUM('user', 'pharmacy') NOT NULL,
  type ENUM('order', 'payment', 'delivery', 'system') NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  link VARCHAR(255),
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_notifications (user_id, user_type, created_at),
  INDEX idx_unread (user_id, is_read)
);

-- Ajouter des exemples de notifications
INSERT INTO notifications (user_id, user_type, type, title, message, link) VALUES
(1, 'user', 'order', 'Commande confirmée', 'Votre commande #1 a été confirmée par la pharmacie', '/commande/1'),
(1, 'user', 'delivery', 'En cours de livraison', 'Votre commande est en route', '/commande/1'),
(1, 'pharmacy', 'order', 'Nouvelle commande', 'Nouvelle commande de Marie Kouadio', '/pharmacie/commandes/1');
