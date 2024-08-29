import axios from 'axios';
import { useEffect, useState } from 'react';

const Comment = ({ parentClub }) => {
  const [inputText, setInputText] = useState('');
  const [commList, setCommList] = useState('');

  useEffect(() => {
    const defualtList = async () => {
      try {
        const response = await axios.get('/data.json');
        const commentList = response.data.comment;
        setCommList(commentList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    defualtList();
  }, []);

  const addComment = () => {
    if (inputText !== '') {
      const lastCmtIndex = commList.length - 1;
      const addedCmtId = commList[lastCmtIndex].key + 1;
      const newComment = {
        key: addedCmtId,
        userid: 'junsu',
        content: inputText,
        date:
          new Date().getFullYear() +
          '-' +
          new Date().getMonth() +
          1 +
          '-' +
          new Date().getDate(),
      };
      setCommList([...commList, newComment]);
      setInputText('');
    }
  };

  return (
    <div>
      {commList &&
        commList.map((v) => {
          return (
            v.parentClub === parentClub && (
              <ul className="commRow" key={v.key}>
                <li>{v.userid}</li>
                <li>{v.content}</li>
                <li>{v.date}</li>
              </ul>
            )
          );
        })}
      댓글작성{' '}
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => (e.key === 'Enter' ? addComment() : null)}
      ></input>
      <p>댓글</p>
      <hr />
    </div>
  );
};

export default Comment;
