import { useState, useEffect } from 'react';
import '../apply.css'; 

const Apply = () => {
  const [formData, setFormData] = useState({
    dealName: '', 
    telegramUsername: '',
    email: '',
    walletAddress: '',
    desiredAllocation: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  

  useEffect(() => {
    const fetchDealName = async () => {
      try {
        const res = await fetch('/api/deal');
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Failed to fetch deal name');
        }

        setFormData((prev) => ({
          ...prev,
          dealName: data.dealName,
        }));
      } catch (err) {
        console.error(err.message);
        setError('Could not fetch deal name. Please try again later.');
      }
    };

    fetchDealName();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // 👈 desiredAllocation da gönderilir
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setMessage('Application submitted successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="page-container"
      style={{
        backgroundImage: `url('yaybackground.png')`,
      }}
    >
      <form onSubmit={handleSubmit} className="form-container">
        <h2 className="form-title">Apply for the Deal</h2>
        <p className="form-desc">Please complete the form — our team will review your submission and respond promptly.</p>

        {error ? (
          <p className="form-error">{error}</p>
        ) : (
          <div className="form-group">
            <input
              type="text"
              name="dealName"
              value={formData.dealName?.toUpperCase() || ''}
              readOnly
              className="form-input underline-input"
            />
          </div>
        )}

        <div className="form-group">
          <input
            type="text"
            name="telegramUsername"
            value={formData.telegramUsername}
            onChange={handleChange}
            placeholder="TELEGRAM USERNAME"
            required
            className="form-input underline-input"
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="EMAIL ADDRESS"
            required
            className="form-input underline-input"
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            name="walletAddress"
            value={formData.walletAddress}
            onChange={handleChange}
            placeholder="WALLET ADDRESS"
            required
            className="form-input underline-input"
          />
        </div>

        <div>
          <input
            type="number"
            name="desiredAllocation"
            value={formData.desiredAllocation}
            onChange={handleChange}
            placeholder="DESIRED ALLOCATION ($)"
            required
            min="0"
            step="any"
            className="form-input underline-input no-spin"
          />
        </div>

        <button type="submit" className="form-submit-button">
          Submit
        </button>

        {message && <p className="form-success">{message}</p>}

        <p className="form-end">If you have any questions or concerns, please contact our customer&nbsp;support&nbsp;team for assistance.</p>
      </form>
    </div>
  );
};

export default Apply;
