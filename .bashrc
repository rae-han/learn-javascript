# ~/.bashrc
#
# Set the Terminal Title

echo -ne "\033[22;0t"                     #Save Title on Stack
echo -ne "\033]0;${HOSTNAME}\007"         #Set New Title

trap 'echo -ne "\033[23;0t"'  EXIT        #Reset Title Window