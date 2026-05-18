FROM node:14.15.5

# Install Angular CLI globally
RUN npm install -g @angular/cli@6.1.4

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# 1. Install all deps WITHOUT running postinstall scripts (skip node-sass compilation)
RUN npm install --ignore-scripts

# 2. Remove the incompatible nested node-sass@4.9.2 from @angular-devkit
RUN rm -rf node_modules/@angular-devkit/build-angular/node_modules/node-sass

# 3. Install node-sass@4.14.1 (compatible with Node 14) at root level
RUN npm install node-sass@4.14.1 --unsafe-perm --no-save

# 4. Rebuild all native addons with correct versions
RUN npm rebuild --unsafe-perm

# Copy the rest of the project
COPY . .

# Expose dev server port
EXPOSE 4200

# Start Angular dev server
CMD ["ng", "serve", "--host", "0.0.0.0", "--disable-host-check"]
