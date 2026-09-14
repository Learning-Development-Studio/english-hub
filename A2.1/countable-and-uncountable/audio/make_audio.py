import asyncio
from pathlib import Path

import edge_tts

OUT = Path(__file__).with_name("fridge-check.mp3")

SCRIPT = """
After work, Marta and Luis are in the kitchen. They want chicken tacos.

Marta: Do we have any tortillas?

Luis: We have a few tortillas. Not many.

Marta: How much chicken do we have?

Luis: We don't have any chicken. We have some cheese and a little salsa.

Marta: I have some onions. How many tomatoes do we have?

Luis: Only two. That is not a lot of tomatoes.

Marta: We need to buy chicken, tomatoes, and some limes.

Luis: Do we have any rice?

Marta: Yes. We have a lot of rice, but rice is not for tacos tonight.

Luis: True. Let's make a list. We don't have much time before the store closes.

Marta: O.K. Chicken, tomatoes, limes. And I want a bottle of water too.

Luis: Water is in the fridge. We have three bottles.

Marta: Perfect. Then we only need food for the tacos.
""".strip()


async def main():
    communicate = edge_tts.Communicate(SCRIPT, "en-US-JennyNeural", rate="-12%")
    await communicate.save(str(OUT))
    print(f"Wrote {OUT} ({OUT.stat().st_size} bytes)")


if __name__ == "__main__":
    asyncio.run(main())
