import { createContext, useContext, useState } from "react";

const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
   const [featuredBusinesses, setFeaturedBusinesses] = useState(null);
   const [featuredArticles, setFeaturedArticles] = useState(null);
   const [articlesTags, setArticlesTags] = useState(null);
   const [businessesTags, setBusinessesTags] = useState(null);

   return (
      <ContentContext.Provider
         value={{
            featuredBusinesses,
            setFeaturedBusinesses,
            featuredArticles,
            setFeaturedArticles,
            articlesTags,
            setArticlesTags,
            businessesTags,
            setBusinessesTags
         }}
      >
         {children}
      </ContentContext.Provider>
   );
};

export const useContent = () => useContext(ContentContext);