import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import githubApi from 'githubApi';
import sprite from 'sprite.svg';
import Svg from 'components/Svg';
import Color from 'styles/color';
import FilesList from 'components/FilesList';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
  gap: 2rem;
`;

const StarsCount = styled.span`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Heading = styled.h1`
  display: flex;
  align-items: center;
`;

const Repo = () => {
  const { username, repo } = useParams();
  const [repoData, setRepoData] = useState({});
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchRepoData = async () => {
      try {
        const { data } = await githubApi.get(`repos/${username}/${repo}`);
        const { data: contents } = await githubApi.get(`repos/${username}/${repo}/contents`);
        setRepoData(data);
        setFiles(contents);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRepoData();
  }, [username, repo]);

  const { full_name, description, stargazers_count, html_url } = repoData;

  return (
    <Container>
      <StarsCount>
        <Svg href={`${sprite}#icon-star-empty`} />
        {stargazers_count}
      </StarsCount>
      <Heading>
        <a href={html_url} target="_blank" rel="noreferrer">
          {full_name}
        </a>
      </Heading>
      <p>{description}</p>
      <FilesList files={files} />
    </Container>
  );
};

export default Repo;
