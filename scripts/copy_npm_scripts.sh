# The node_modules folder isn't uploaded to Pantheon
# This script runs after npm install and copies the files to the theme dist folder
# Note that this is only necessary for dependencies used in production -- dev dependencies like sass-rem can just hang out in the node_modules folder

NODE_FITVIDS=node_modules/fitvids/dist
DIST_FITVIDS=dist/js/fitvids

NODE_SCROLLSPY=node_modules/vanillajs-scrollspy/dist
DIST_SCROLLSPY=dist/js/vanillajs-scrollspy

NODE_STICKYBITS=node_modules/stickybits/dist
DIST_STICKYBITS=dist/js/stickybits

NODE_SCROLLREVEAL=node_modules/scrollreveal/dist
DIST_SCROLLREVEAL=dist/js/scrollreveal

if [ -e "$NODE_FITVIDS" ]; then
  if [ -e "$DIST_FITVIDS" ]; then
    rm -rf "$DIST_FITVIDS"
  fi
  cp -r "$NODE_FITVIDS" "$DIST_FITVIDS"
fi

if [ -e "$NODE_SCROLLSPY" ]; then
  if [ -e "$DIST_SCROLLSPY" ]; then
    rm -rf "$DIST_SCROLLSPY"
  fi
  cp -r "$NODE_SCROLLSPY" "$DIST_SCROLLSPY"
fi

if [ -e "$NODE_SCROLLREVEAL" ]; then
  if [ -e "$DIST_SCROLLREVEAL" ]; then
    rm -rf "$DIST_SCROLLREVEAL"
  fi
  cp -r "$NODE_SCROLLREVEAL" "$DIST_SCROLLREVEAL"
fi

# Note that we're copying the whole stickybits dist folder here, as we need a couple of scripts
if [ -e "$NODE_STICKYBITS" ]; then
  if [ -e "$DIST_STICKYBITS" ]; then
    rm -rf "$DIST_STICKYBITS"
  fi
  cp -r "$NODE_STICKYBITS" "$DIST_STICKYBITS"
fi
