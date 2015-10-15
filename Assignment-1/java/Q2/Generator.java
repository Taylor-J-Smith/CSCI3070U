import java.util.Random;

public class Generator
{
	private String alphabet;
	private Random r;

	public Generator(String a)
	{
		this.alphabet = a;
		this.r = new Random(0);
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
			System.out.println(i + ": " + s);
		}

		return array;
	}
}