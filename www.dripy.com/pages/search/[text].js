import React from "react";
import { db } from "@/config/firebase";

import Head from "next/head";

import styles from "./search.module.scss";

import Layout from "components/Layout";
import Button from "@/components/FilterButton";
import ProductCard from "@/components/ProductCard/product-card";
import { useAuth } from "@/firebase/context";

export default function SearchPage({ data, query }) {
  const { user, loading } = useAuth();

  console.log(data, query);

  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <div className={styles.header}>
            <h1 className={styles.title}>
              Listing {data.length} products for "{query.text}"
            </h1>
            <div className={styles.headerButtons}>
              <Button type="sort" style={{ marginRight: 20 }} />
              <Button count={0} />
            </div>
          </div>
          {/* <div className={styles.products}>
            {!loading &&
              data.map((product) => {
                return (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    brand={product.brand}
                    name={product.product_name}
                    image={product.cover_photo}
                    price={product.price}
                    sale_price={product.sale_price}
                    favorite={user?.favorites?.includes(product.id)}
                  />
                );
              })}
          </div> */}
        </main>
      </div>
    </Layout>
  );
}

SearchPage.getInitialProps = async function ({ query }) {
  let data = {};
  let error = {};
  // await db
  //   .collection("Products")
  //   .get()
  //   .then(function (querySnapshot) {
  //     data = querySnapshot.docs
  //       .filter((item) => item.data().productDisplayName.includes(query.text) || item.data().gender.includes(query.text)
  //       || item.data().masterCategory.includes(query.text) || item.data().subCategory.includes(query.text) 
  //       || item.data().sellers.includes(query.text))
  //       .map(function (doc) {
  //         return { id: doc.id, ...doc.data() };
  //       });
  //   })
  //   .catch((e) => (error = e));
  //   console.log("data", data)

  const res = await fetch(`http://localhost:5000/search?query=mens shirt`)
  const result = await res.json()
  console.log(result.searchResult)

  return {
    data,
    error,
    query,
  };
};
