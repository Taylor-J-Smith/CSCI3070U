files = Main.java Sorts.java Generator.java

run : prepare
	java Main other
prepare :
	javac $(files)
	mkdir stringFiles
	java Main generate

clean :
	rm -r *.class stringFiles
