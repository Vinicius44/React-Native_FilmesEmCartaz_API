import React, {useState, useEffect} from "react";
import {Text, SafeAreaView, Button, FlatList,Image,  View, StyleSheet, ActivityIndicator} from "react-native";

const App = () => {

  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

   useEffect(()=>{
        const requestMovies = async () => {
          setLoading(true);
          const req = await fetch("https://api.b7web.com.br/cinema/");
          const json = await req.json();

          if(json){
            setMovies(json);
          }
          setLoading(false);
        }

        requestMovies();
    }, [])

  
  return(

   

    <SafeAreaView style={style.container}>
      {loading &&

        <>
          <View style={style.loadingArea}>
            <ActivityIndicator size="large" color="white"/>
            <Text style={style.loadingText}>Carregando...</Text>
          </View>
        </>
      
      }

      {!loading && 
      
        <>
           <Text style={style.totalMoviesText}>Total de filmes: {movies.length} </Text>
            <FlatList
              style={style.list}
              data={movies}
              renderItem={({item}) => (
                <View style={style.movieItem}>
                  <Image source={{uri: item.avatar}} style={style.movieImages} resizeMode="contain"/>
                  <Text style={style.movieTitle}>{item.titulo}</Text>
                </View>
              )}
              //keyExtractor={item => item.titulo}
            />

        </>
      
      }
     
      
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333"
  },

  loadingArea:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  loadingText:{
    color: "white"
  },
  totalMoviesText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10
  },

  list: {
    flex: 1
  },
  movieItem:{
    marginBottom: 30
  },
  movieImages:{
    height: 350
  },
  movieTitle:{
    color: "white",
    fontSize: 24,
    textAlign: "center",
    marginTop: 5
  }
});


export default App;
