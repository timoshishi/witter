import { useState, useCallback } from 'react';
import { Box, Flex, Button } from '@chakra-ui/react';
import Cropper, { Area } from 'react-easy-crop';
import { getCroppedImg } from './cropper.functions';
import type { HandleCroppedImage } from '../imageUploader.types';
import { Controls } from './Controls/Controls';

interface CropperProps {
  previewUrl: string;
  handleCroppedImage: HandleCroppedImage;
  clearFile: () => void;
  cropShape: 'round' | 'rect';
}

export const EasyCropper = ({
  previewUrl,
  handleCroppedImage,
  clearFile,
  cropShape = 'rect',
}: CropperProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [aspectRatio, setAspectRatio] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        previewUrl,
        croppedAreaPixels,
        rotation
      );
      handleCroppedImage({ croppedImage, croppedAreaPixels, aspectRatio });
      // setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previewUrl, croppedAreaPixels, rotation, aspectRatio]);
  const handleRotate = () => {
    if (rotation < 360) {
      setRotation(rotation + 90);
    } else {
      setRotation(0);
    }
  };

  const onClose = useCallback(() => {
    // setCroppedImage(null);
  }, []);

  return (
    <Flex
      minH={['100vh', '50%']}
      maxH='100vh'
      flexDir='column'
      position='relative'
      bg='whiteAlpha.100'
      justifyContent={['space-between']}>
      <Flex
        justifyContent={['space-between', 'space-between', 'flex-end']}
        w='100%'
        p='3'
        alignSelf={'flex-end'}>
        <Button
          variant='outline'
          colorScheme='telegram'
          onClick={clearFile}
          size={['sm', 'sm', 'sm']}>
          Cancel
        </Button>
        <Button
          variant='solid'
          colorScheme='telegram'
          size={['sm', 'sm', 'sm']}
          onClick={getCroppedImage}>
          Next
        </Button>
      </Flex>
      <Box position='relative'>
        <Cropper
          image={previewUrl}
          crop={crop}
          rotation={rotation}
          zoom={zoom}
          showGrid={false}
          style={{
            containerStyle: {
              width: '100%',
              height: '100%',
              backgroundColor: 'blackAlpha.100',
              position: 'relative',
            },
            mediaStyle: {
              width: '100%',
              height: 'auto',
            },
          }}
          objectFit='auto-cover'
          cropShape={cropShape}
          aspect={aspectRatio}
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
        />
        <Box position='absolute' bottom='0'>
          <Controls
            setZoom={setZoom}
            setAspectRatio={setAspectRatio}
            handleRotate={handleRotate}
            cropShape={cropShape}
          />
        </Box>
      </Box>
    </Flex>
  );
};
