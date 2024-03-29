import React from "react";
import { chakra, Flex, useColorModeValue, Icon, Button } from "@chakra-ui/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function Paginator (props: {
  currentPage: number,
  totalPages: number,
  setCurrentPage: any}
  ) {
  const PagButton = (props: any) => {
    const activeStyle = {
      color: useColorModeValue("green", "gray.200"),
    };
    return (
      <chakra.button
        mx={1}
        px={4}
        py={2}
        rounded="md"
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.700", "gray.200")}
        opacity={props.disabled && 0.6}
        _hover={!props.disabled && activeStyle}
        cursor={props.disabled && "not-allowed"}
        {...(props.active && activeStyle)}
        display={props.p && !props.active && { base: "none", sm: "block" }}
        onClick={props.onClick}
      >
        {props.children}
      </chakra.button>
    );
  };


  const onClickPrevious = () => {
    if (props.currentPage > 1) props.setCurrentPage(props.currentPage - 1)
  }
  
  const onClickNext = () => {
    if (props.currentPage !== props.totalPages) props.setCurrentPage(props.currentPage + 1)
  }

  return (
    <Flex
      p={50}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Flex>
        <PagButton>
          <Icon  
            onClick={onClickPrevious}
            as={IoIosArrowBack}
            color={useColorModeValue("gray.700", "gray.200")}
            boxSize={4}
          />
        </PagButton>
        {props.currentPage - 1 === 0 ? <></> : <PagButton onClick={onClickPrevious}>{props.currentPage - 1}</PagButton>} 
        <PagButton active> {props.currentPage}</PagButton>
        {props.currentPage === props.totalPages ? <></> : 
          <>
            <PagButton onClick={onClickNext}>{props.currentPage + 1}</PagButton>
            <PagButton>... {props.totalPages}</PagButton>
          </>
        } 
        <PagButton onClick={() => onClickNext}>
          <Icon
            onClick={onClickNext}
            as={IoIosArrowForward}
            color={useColorModeValue("gray.700", "gray.200")}
            boxSize={4}
          />
        </PagButton>
      </Flex>
    </Flex>
  );
};