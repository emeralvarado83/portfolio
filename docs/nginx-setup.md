# Configuracion de Nginx como Reverse Proxy

## 1. Instalar Nginx

```bash
sudo apt install nginx
```

## 2. Crear configuracion del sitio

```bash
sudo nano /etc/nginx/sites-available/portfolio
```

Pegar lo siguiente (cambiar `tu-dominio.com` por tu dominio o IP):

```nginx
server {
    listen 80;
    server_name tu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 3. Activar el sitio y reiniciar Nginx

```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

## 4. SSL con Certbot (cuando tengas dominio)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d tu-dominio.com
```

Certbot configura la renovacion automatica del certificado.
