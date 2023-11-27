import { useEffect, useState } from 'react';

const DelayedContent = () => {
  const [content, setContent] = useState('');
  const textArray = ['First sentence.', 'Second sentence.', 'Third sentence.'];

  useEffect(() => {
    let currentIndex = 0;

    const timer = setInterval(() => {
      setContent(textArray[currentIndex]);
      currentIndex = (currentIndex + 1) % textArray.length;
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <p>{content}</p>;
};

export default DelayedContent;
