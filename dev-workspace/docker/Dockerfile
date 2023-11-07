FROM publishpress/dev-workspace-terminal:generic-2

ENV PLUGIN_NAME="PublishPress Blocks"
ENV PLUGIN_TYPE="FREE"

ENV NVM_DIR=/root/.nvm
ENV NODE_VERSION=15.14.0
ENV NPM_VERSION=7.7.6

RUN set -ex; \
    # Install Node.js and NPM
    . ${NVM_DIR}/nvm.sh && nvm install ${NODE_VERSION}; \
    . ${NVM_DIR}/nvm.sh && nvm use ${NODE_VERSION}; \
    . ${NVM_DIR}/nvm.sh && nvm alias default ${NODE_VERSION}; \
    node --version; \
    npm install -g npm@${NPM_VERSION}; \
    npm --version; \
    echo ". ${NVM_DIR}/nvm.sh && nvm use ${NODE_VERSION}" >> /root/.zshrc; \
    echo ". ${NVM_DIR}/nvm.sh && nvm alias default ${NODE_VERSION}" >> /root/.zshrc

COPY ./scripts/json_translations.sh /scripts
