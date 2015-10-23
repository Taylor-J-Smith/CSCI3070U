import java.util.Arrays;

public class Main{

	public static void main(String[] args){

		if(args[0].compareTo("generate") == 0)
		{
			System.out.println("Generating");
			Generator g = new Generator("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijkdlmnopqrstuvwxyz");
			g.generateToFile(100000000,100, "stringFiles/100000000-Strings.txt");
		}
		else
		{
			System.out.println("Sorting");
			long startTime = System.currentTimeMillis();
			Sorts.diskSort("stringFiles/100000000-Strings.txt", 100, 1000000);
			long endTime = System.currentTimeMillis();

			System.out.println("Duration: " + (endTime - startTime));
		}
	}
}
