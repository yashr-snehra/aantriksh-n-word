import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

const SwrExample = () => {
  const { data: countries, error, isValidating } = useSWR('https://restcountries.com/v2/all', fetcher);

  if (!countries && isValidating) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className='failed'>Failed to load</div>;
  }

  return (
    <div>
      {countries &&
        countries.map((country, index) => (
          <img key={index} src={country.flags.png} alt='flag' width={100} />
        ))}
    </div>
  );
};

export default SwrExample;
