import useSWR from "swr";

export default function JokeForm() {
  const { mutate } = useSWR("/api/jokes");

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const newJoke = {
      joke: data.joke,
    };

    const response = await fetch(
      "/api/jokes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newJoke),
      } // fetch options object
    );

    if (response.ok) {
      event.target.reset();
      mutate();
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="joke">Add a new Joke</label>
      <input type="text" id="joke" name="joke" />
      <button type="submit">submit</button>
    </form>
  );
}
