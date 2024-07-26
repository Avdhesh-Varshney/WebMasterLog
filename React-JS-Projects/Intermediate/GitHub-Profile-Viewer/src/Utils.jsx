const handleSort = (repos, sortOption) => {
    switch (sortOption) {
        case 'newest':
            return repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        case 'oldest':
            return repos.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        case 'most_stars':
            return repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
        case 'most_forks':
            return repos.sort((a, b) => b.forks_count - a.forks_count);
        default:
            return repos;
    }
};


export function filterRepos(filter, sortOption, repos) {
    const filtered = repos.filter((repo) =>
        repo.name.toLowerCase().includes(filter.toLowerCase())
    );
    const sorted = handleSort(filtered, sortOption)
    return sorted;
}

export function Info({message}) {
    return <p className='text-center pt-52'>{message}</p>;
}