import { useQuery } from '@tanstack/react-query';

const fetchData = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=10');
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

const RenderLoading = () => <h2>Loading...</h2>;

const RenderError = ({ error }) => <div className="error">Error: {error.message}</div>;

const RenderData = ({ comments }) => (
  <div>
    <h1 className='title'>Email address of users</h1>
    {comments.map((comment) => (
      <h2 key={comment.id} className="users">
        {comment.id}. {comment.email}
      </h2>
    ))}
  </div>
);

const ReactQueryExample = () => {
  const { data: comments, isLoading, error } = useQuery({
    queryFn: fetchData,
    queryKey: ['comments'],
  });

  return (
    <>
      {isLoading && <RenderLoading />}
      {error && <RenderError error={error} />}
      {comments && Array.isArray(comments) && <RenderData comments={comments} />}
    </>
  );
};

export default ReactQueryExample;
