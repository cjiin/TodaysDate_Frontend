import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import FestivalAPI from "./FestivalAPI";
import Pagination from "./Pagination";
import FestivalItem from "./FestivalItem";


const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px 30px; 
  margin: 0 auto; 

  @media (max-width: 768px) {
    flex-direction: column;
    padding-left: 20px;
  }
`;


const FestivalContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
  }, [currentPage]);


  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <FestivalAPI page={currentPage}>
        {(apiData, totalPages) => (
          <div>
            {apiData.length > 0 ? (
              <>
                <Container>
                  {apiData.map((item, index) => (
                    <FestivalItem key={index} item={item} />
                  ))}
                </Container>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <div>Loading...</div>
            )}
          </div>
        )}
      </FestivalAPI>
    </div>
  );
};

export default FestivalContainer;

