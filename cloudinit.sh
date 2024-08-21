#!/bin/sh -

# Download Golang Version 1.22.3
wget https://go.dev/dl/go1.22.3.linux-amd64.tar.gz -O go.tar.gz
sudo tar -xzvf go.tar.gz -C /usr/local

# Add go to PATH and Save the profile
echo export PATH=$HOME/go/bin:/usr/local/go/bin:$PATH >> ~/.profile
source ~/.profile