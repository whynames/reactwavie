import React from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled components for custom styling
const GameContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "min(calc(100% - 48px), calc((100vh - 200px) * 1920/1080))", // Responsive width based on height constraint
  height: "min(calc((100vw - 48px) * 1080/1920), calc(100vh - 200px))", // Responsive height based on width constraint
  maxWidth: "1920px",
  maxHeight: "1080px",
  margin: "0 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.background.default,
  overflow: "hidden"
}));

const LoadingOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.background.paper,
  zIndex: 1,
}));

const StyledUnity = styled(Unity)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "contain"
});

function App() {
  const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
    loaderUrl: "build/WavieWeb/Build/WavieWeb.loader.js",
    dataUrl: "build/WavieWeb/Build/WavieWeb.data",
    frameworkUrl: "build/WavieWeb/Build/WavieWeb.framework.js",
    codeUrl: "build/WavieWeb/Build/WavieWeb.wasm",
    streamingAssetsUrl: "build/WavieWeb/StreamingAssets",
    webglContextAttributes: {
      preserveDrawingBuffer: true,
      powerPreference: 2,
    }
  });

  return (
    <Container 
      maxWidth={false} 
      sx={{ 
        minHeight: "100vh", // Changed from height to minHeight
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center",
        py: 4, // Increased padding
        px: 3
      }}
    >
      <Typography 
        variant="h2" 
        sx={{ 
          my: 4,
          fontFamily: "'Bubblegum Sans', cursive",
          color: '#FF8C42',
          textAlign: 'center',
          textShadow: '3px 3px 0px rgba(255,140,66,0.2)',
          letterSpacing: '2px',
          transform: 'rotate(-2deg)',
          '&:hover': {
            transform: 'rotate(2deg)',
            transition: 'transform 0.3s ease'
          }
        }}
      >
        Wavie the Cat
      </Typography>
      <GameContainer>
        {!isLoaded && (
          <LoadingOverlay>
            <CircularProgress 
              variant="determinate" 
              value={loadingProgression * 100} 
              size={60}
              thickness={4}
            />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Loading... ({Math.round(loadingProgression * 100)}%)
            </Typography>
          </LoadingOverlay>
        )}
        <StyledUnity 
          unityProvider={unityProvider} 
           devicePixelRatio={window.devicePixelRatio}
          style={{ 
            visibility: isLoaded ? "visible" : "hidden" 
          }}
        />
      </GameContainer>
    </Container>
  );
}

export default App; 