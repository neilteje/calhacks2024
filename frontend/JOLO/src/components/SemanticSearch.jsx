import React, { useState, useEffect, useCallback, useContext, createContext } from 'react';
import axios from 'axios';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Create a Context for Search State
const SearchContext = createContext();

// SearchProvider to handle state and make it reusable across components
const SearchProvider = ({ children }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const searchWithChroma = useCallback(async (query) => {
        if (query.length < 3) return;
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:5001/api/search`, {
                params: { query }
            });

            if (response.data) {
                setSearchResults(response.data.results || []);
            }
        } catch (error) {
            console.error("Error during semantic search:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <SearchContext.Provider value={{ searchResults, searchQuery, setSearchQuery, searchWithChroma, isLoading }}>
            {children}
        </SearchContext.Provider>
    );
};

// Custom Hook to Use Search Context
const useSearch = () => {
    return useContext(SearchContext);
};

// Main Component: Complex UI for Search Integration
const SemanticSearchPage = () => {
    const { searchResults, searchQuery, setSearchQuery, searchWithChroma, isLoading } = useSearch();

    const handleSearchInput = (text) => {
        setSearchQuery(text);
    };

    const handleSearch = () => {
        searchWithChroma(searchQuery);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>JOLO Semantic Search</Text>
                <Ionicons name="search-outline" size={24} color="#FFF" />
            </View>
            
            {/* Search Input */}
            <View style={styles.searchBar}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search through your thoughts..."
                    placeholderTextColor="#888"
                    value={searchQuery}
                    onChangeText={handleSearchInput}
                />
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Ionicons name="search-outline" size={20} color="#FFF" />
                    <Text style={styles.searchButtonText}>Search</Text>
                </TouchableOpacity>
            </View>

            {/* Loader */}
            {isLoading && (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#FFF" />
                    <Text style={styles.loaderText}>Searching...</Text>
                </View>
            )}

            {/* Results */}
            <FlatList
                data={searchResults}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.resultBox}>
                        <Text style={styles.resultTitle}>{item.title}</Text>
                        <Text style={styles.resultSnippet}>{item.snippet}</Text>
                    </View>
                )}
                ListEmptyComponent={() => !isLoading && <Text style={styles.noResults}>No results found.</Text>}
                contentContainerStyle={styles.resultsContainer}
            />
        </SafeAreaView>
    );
};

// Page Wrapper
const SemanticSearchApp = () => {
    return (
        <SearchProvider>
            <SemanticSearchPage />
        </SearchProvider>
    );
};

// Styles - Keeping it Complex
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    headerText: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: '600',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333',
        borderRadius: 25,
        padding: 15,
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        color: '#FFF',
        fontSize: 16,
        paddingHorizontal: 10,
    },
    searchButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#007AFF',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
    },
    searchButtonText: {
        color: '#FFF',
        marginLeft: 5,
        fontSize: 14,
    },
    loaderContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    loaderText: {
        color: '#FFF',
        marginTop: 10,
    },
    resultsContainer: {
        paddingBottom: 30,
    },
    resultBox: {
        backgroundColor: '#1E1E1E',
        padding: 20,
        borderRadius: 15,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#333',
    },
    resultTitle: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 5,
    },
    resultSnippet: {
        color: '#AAA',
        fontSize: 14,
    },
    noResults: {
        textAlign: 'center',
        color: '#888',
        fontSize: 16,
        marginTop: 50,
    }
});

export default SemanticSearchApp;
