import React, { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    setIsSubmitting(true);
    setStatus('');

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        form.reset();
        setStatus('✅ Message sent successfully!');
      } else {
        const json = await res.json();
        setStatus(`❌ ${json.error || 'Submission failed. Please try again.'}`);
      }
    } catch (err) {
      setStatus('❌ Network error. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📬 Send Us a Message</h2>

      <form
        onSubmit={handleSubmit}
        action="https://formspree.io/f/xeorkgqe"
        method="POST"
        style={styles.form}
      >
        <label htmlFor="name" style={styles.label}>Name</label>
        <input type="text" id="name" name="name" required style={styles.input} />

        <label htmlFor="email" style={styles.label}>Email</label>
        <input type="email" id="email" name="_replyto" required style={styles.input} />

        <label htmlFor="message" style={styles.label}>Message</label>
        <textarea id="message" name="message" rows="5" required style={styles.textarea}></textarea>

        <button type="submit" disabled={isSubmitting} style={styles.button}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>

        {status && (
          <p
            style={{
              ...styles.status,
              color: status.startsWith('✅') ? '#28a745' : '#dc3545',
            }}
          >
            {status}
          </p>
        )}
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '30px',
    borderRadius: '12px',
    backgroundColor: '#fff',
    boxShadow: '0 6px 24px rgba(0,0,0,0.08)',
    fontFamily: 'system-ui, sans-serif',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '16px',
    color: '#222',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '6px',
    marginTop: '12px',
  },
  input: {
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    outline: 'none',
  },
  textarea: {
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    resize: 'vertical',
  },
  button: {
    marginTop: '20px',
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#0066ff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  status: {
    marginTop: '16px',
    fontSize: '14px',
    fontWeight: '500',
  },
};
