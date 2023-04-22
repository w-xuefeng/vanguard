if hash bun 2>/dev/null; then
  v=$(bun --version)
  echo "👌 Bun version: $v"
  echo '🥰 Bun has been installed before!'
else
  echo '🚀 Start installing Bun ...'
  curl -fsSL https://bun.sh/install | bash
  {
    ln -s $HOME/.bun/bin/bun /usr/bin
  } || {
    sudo ln -s $HOME/.bun/bin/bun /usr/bin
  }
  echo '🥰 Bun has been installed!'
  v=$(bun --version)
  echo "👌 Bun version: $v"
fi
