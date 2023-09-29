import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Styled components
const Container = styled.div`
  flex: 1;
  background-color: #ffffff;
  padding: 20px;
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const ArticleItem = styled.div`
  margin-bottom: 10px;
`;

const ArticleTitle = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #555;
`;

const ArticleContent = styled.p`
  color: #666;
`;

function Articles() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const articlesPromise = axios.get(
      process.env.REACT_APP_API_URL + "/api/article/"
    );
    articlesPromise.then((response) => {
      setArticles(response.data.articles);
    });
  }, []);
  return (
    <Container>
      <Title>Articles</Title>
      {articles.map((article, index) => (
        <div
          key={index}
          onClick={() => navigate("details", { state: { article } })}
        >
          <ArticleItem>
            <ArticleTitle>{article.title}</ArticleTitle>
            <ArticleContent>{article.content}</ArticleContent>
          </ArticleItem>
        </div>
      ))}
    </Container>
  );
}

export default Articles;
