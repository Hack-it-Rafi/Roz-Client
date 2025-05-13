import { useNavigate } from 'react-router-dom';

const ConfirmationPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/'); // Redirect to home page
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Job Posted!</h1>
      <p>Thank you for your request.</p>
      <button
        onClick={handleBackToHome}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Back to Home
      </button>
    </div>
  );
};

export default ConfirmationPage;