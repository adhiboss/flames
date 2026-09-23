import React, { useState } from 'react';
import { Star } from 'lucide-react';
import styles from './ReviewSection.module.css';

export const ReviewSection: React.FC = () => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [nostalgic, setNostalgic] = useState<boolean | null>(null);
  const [likedUI, setLikedUI] = useState<boolean | null>(null);
  const [note, setNote] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    
    setSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, nostalgic, likedUI, note })
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className={styles.container}>
        <div className={styles.successMessage}>
          Thank you for your feedback! ✨
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Leave a Review</h2>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Rating */}
        <div className={styles.formGroup}>
          <label>Rating</label>
          <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`${styles.starBtn} ${(hoverRating || rating) >= star ? styles.activeStar : ''}`}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              >
                <Star className={styles.starIcon} fill={(hoverRating || rating) >= star ? 'currentColor' : 'none'} />
              </button>
            ))}
          </div>
        </div>

        {/* Nostalgic */}
        <div className={styles.formGroup}>
          <label>Did you feel nostalgic?</label>
          <div className={styles.buttonGroup}>
            <button
              type="button"
              className={`${styles.toggleBtn} ${nostalgic === true ? styles.activeYes : ''}`}
              onClick={() => setNostalgic(true)}
            >
              Yes
            </button>
            <button
              type="button"
              className={`${styles.toggleBtn} ${nostalgic === false ? styles.activeNo : ''}`}
              onClick={() => setNostalgic(false)}
            >
              No
            </button>
          </div>
        </div>

        {/* Liked UI */}
        <div className={styles.formGroup}>
          <label>Did you like the UI?</label>
          <div className={styles.buttonGroup}>
            <button
              type="button"
              className={`${styles.toggleBtn} ${likedUI === true ? styles.activeYes : ''}`}
              onClick={() => setLikedUI(true)}
            >
              Yes
            </button>
            <button
              type="button"
              className={`${styles.toggleBtn} ${likedUI === false ? styles.activeNo : ''}`}
              onClick={() => setLikedUI(false)}
            >
              No
            </button>
          </div>
        </div>

        {/* Note */}
        <div className={styles.formGroup}>
          <label>A small note (optional)</label>
          <textarea
            className={styles.textarea}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Tell us what you think..."
            rows={3}
          />
        </div>

        <button 
          type="submit" 
          className={styles.submitBtn}
          disabled={rating === 0 || submitting}
        >
          {submitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};
