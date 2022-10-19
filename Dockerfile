FROM node:16-alpine AS development
ENV NODE_ENV development
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json .
COPY yarn.lock .
# Copy SSL certificates into the image
# COPY cert.crt /usr/local/share/ca-certificates/cert.crt

# # Update the certificate stores
# RUN update-ca-certificates --verbose --fresh && \
#     npm config set cafile /usr/local/share/ca-certificates/cert.crt && \
#     yarn config set cafile /usr/local/share/ca-certificates/cert.crt
COPY cert.crt .
RUN yarn config set cafile ./cert.crt
RUN yarn install
# Copy app files
COPY . .
# Expose port
EXPOSE 3000
# Start the app
CMD [ "yarn", "start" ]