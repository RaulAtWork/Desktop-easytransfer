package main

import (
	"flag"
	"log"
	"os"
)

type flags struct {
	addr       *string
	chunkSize  *int
	destFolder *string
	isServer   *bool
}

func main() {
	flags := flags{}
	flags.isServer = flag.Bool("server", false, "Start easytransfer in server mode. If not, it will start as a client")

	// Get address (todo! Make this use actual default address by using dial and show it when initializing the server)
	flags.addr = flag.String("address", "localhost:3287", "Address:Port at which the server will bind to / client will connect to")

	// Set buffer size for streaming
	flags.chunkSize = flag.Int("chunk", 100, "Size in MB of chunks size to be used as the streaming buffer")

	// Get destination folder for this run
	dest, err := os.UserHomeDir()
	if err != nil {
		log.Fatal("Failed to find user home directory to set as default destination folder")
	}
	dest = dest + string(os.PathSeparator) + "Downloads"

	flags.destFolder = flag.String("destination", dest, "Destination folder where the files will be written to (client only)")

	flag.Parse()

	if *flags.isServer {
		startServer(&flags)
	} else {
		startClient(&flags)
	}
}
