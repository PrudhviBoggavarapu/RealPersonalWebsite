#!/bin/bash

# Create a temporary directory for the profile
# mktemp creates a unique temporary directory securely
TMP_PROFILE_DIR=$(mktemp -d -t firefox-temp-profile.XXXXXXXXXX)

# Ensure the directory is cleaned up even if the script is interrupted
trap 'rm -rf "$TMP_PROFILE_DIR"' EXIT

echo "Launching Firefox with temporary profile: $TMP_PROFILE_DIR"

# Launch Firefox
# -no-remote: Ensures this runs as a separate instance, not connecting to an existing one.
# -profile: Specifies the directory to use for the profile.
# "$@": Passes any additional arguments you give the script to Firefox.
firefox -no-remote -profile "$TMP_PROFILE_DIR" "$@"

echo "Firefox closed. Temporary profile will be removed."

# The trap command handles the cleanup automatically on exit.
exit 0
