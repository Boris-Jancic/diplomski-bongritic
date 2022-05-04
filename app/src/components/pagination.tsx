import React from "react";
import { chakra, Flex, useColorModeValue, Icon } from "@chakra-ui/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function Paginator () {
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
      >
        {props.children}
      </chakra.button>
    );
  };
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
            as={IoIosArrowBack}
            color={useColorModeValue("gray.700", "gray.200")}
            boxSize={4}
          />
        </PagButton>
        <PagButton p>1</PagButton>
        <PagButton p active>
          2
        </PagButton>
        <PagButton p>3</PagButton>
        <PagButton p>4</PagButton>
        <PagButton p>5</PagButton>
        <PagButton>
          <Icon
            as={IoIosArrowForward}
            color={useColorModeValue("gray.700", "gray.200")}
            boxSize={4}
          />
        </PagButton>
      </Flex>
    </Flex>
  );
};