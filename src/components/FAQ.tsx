import { useState } from 'react';
import type { FAQItem } from '../types';
import styles from '../styles/components/sections.module.css';

interface FAQProps {
  items: FAQItem[];
}

/**
 * FAQ component with accordion functionality
 */
export default function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleItem(index);
    }
  };

  return (
    <article className={styles.card} id="faq" style={{ marginTop: '1rem' }}>
      <h3>Frequently Asked Questions</h3>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`${styles.faqItem} ${isOpen ? styles.open : ''}`}
            role="region"
            aria-labelledby={`faq-question-${index}`}
          >
            <div
              className={styles.faqQ}
              id={`faq-question-${index}`}
              onClick={() => toggleItem(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
            >
              <span>{item.question}</span>
              <span className={styles.faqIcon} aria-hidden="true">
                {isOpen ? '▼' : '▶'}
              </span>
            </div>
            <div
              className={styles.faqA}
              id={`faq-answer-${index}`}
              role="region"
              aria-hidden={!isOpen}
            >
              <div dangerouslySetInnerHTML={{ __html: item.answer }} />
            </div>
          </div>
        );
      })}
    </article>
  );
}

