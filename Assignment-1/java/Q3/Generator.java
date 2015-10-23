import java.util.Random;
import java.io.*;

public class Generator
{
	private String alphabet;
	private Random r;

	public Generator(String a)
	{
		this.alphabet = a;
		this.r = new Random();
	}

	public String[] generate(int numStrings, int stringLength)
	{

		String[] array = new String[numStrings];

		for(int i = 0; i < numStrings; i++)
		{
			String s = "";

			for(int j = 0; j < stringLength; j++)
			{
				s += alphabet.charAt(r.nextInt(alphabet.length()));
			}
			array[i] = s;
		}

		return array;
	}

	public void generateToFile(int numStrings, int stringLength, String filename)
	{
		BufferedWriter outputStream = null;

		try
		{
			outputStream = new BufferedWriter(new FileWriter(filename));
		}catch(IOException E){}

		for(int i = 0; i < numStrings; i++)
		{
			String s = "";

			for(int j = 0; j < stringLength; j++)
			{
				s += alphabet.charAt(r.nextInt(alphabet.length()));
			}

			try
			{
				outputStream.write(s);
				outputStream.newLine();
				outputStream.flush();
			}catch(IOException E){}
		}
	}
}
