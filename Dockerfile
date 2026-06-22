FROM node:20-slim

RUN apt-get update && apt-get upgrade -y && apt-get install -y --no-install-recommends \
    libstdc++6 \
    libgcc-s1 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 4050

CMD ["npx", "vite"]
