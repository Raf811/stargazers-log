const repositoryList = document.querySelector("#repository-list");

async function loadRepositories() {
  try {
    const response = await fetch("events.json");

    if (!response.ok) {
      throw new Error(`Unable to load repositories: ${response.status}`);
    }

    const repositories = await response.json();

    repositoryList.replaceChildren();

    repositories.forEach((repository) => {
      const item = document.createElement("li");
      item.className = "repository";

      const link = document.createElement("a");
      link.href = repository.url;
      link.textContent = repository.name;
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      const description = document.createElement("p");
      description.textContent = repository.description;

      const starredAt = document.createElement("time");
      starredAt.className = "starred-at";
      starredAt.dateTime = repository.starredAt;
      starredAt.textContent = `Starred ${new Date(repository.starredAt).toLocaleDateString()}`;

      item.append(link, description, starredAt);
      repositoryList.append(item);
    });
  } catch (error) {
    repositoryList.replaceChildren();

    const item = document.createElement("li");
    item.textContent = "Repositories could not be loaded.";
    repositoryList.append(item);
  }
}

loadRepositories();
