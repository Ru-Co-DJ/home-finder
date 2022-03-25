import Link from "next/link";
import Image from "next/image";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { baseUrl, fetchApi } from "../utils/fetchApi";
import Property from "../components/Property";

const Banner = ({
  purpose,
  title1,
  title2,
  desc1,
  desc2,
  linkName,
  buttonText,
  imageUrl,
}) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
    <Image src={imageUrl} alt={"banner"} width={500} height={300} />
    <Box p="5">
      <Text color="gray.500" fontSize="sm" fontWeight="meduim">
        {purpose}
      </Text>
      <Text fontSize="3xl" fontWeight="bold">
        {title1}
        {<br />}
        {title2}
      </Text>
      <Text fontSize="lg" paddingTop="3" paddingButtom="3" color="gray.700">
        {desc1}
        <br />
        {desc2}
      </Text>
      <Button fontSize="xl">
        <Link href={linkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
);

export default function Home({ propertiesForSale, propertiesForRent }) {
  return (
    <Box>
      <Banner
        purpose="Rent HOME"
        title1="Rental homes for"
        title2="Everyone"
        desc1="Expolore Apartments, Villas, Homes"
        desc="and MORE !"
        buttonText="Explore Renting"
        linkName="/search?purpose=for-rent"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />
      <Flex flexWrap="wrap">
        {propertiesForRent.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>

      <Banner
        purpose="Buy a HOME"
        title1="Find, Buy & Own Your"
        title2="Dream Home"
        desc1="Expolore Apartments, Villas, Homes"
        desc="and MORE !"
        buttonText="Explore Buying"
        linkName="/search?purpose=for-sale"
        imageUrl="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
      />
      <Flex flexWrap="wrap">
        {propertiesForSale.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
    </Box>
  );
}

export async function getStaticProps() {
  const proprtyForSale = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
  );
  const proprtyForRent = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
  );

  return {
    props: {
      propertiesForSale: proprtyForSale?.hits,
      propertiesForRent: proprtyForRent?.hits,
    },
  };
}
