import type { Dimensions, GetCroppedImageReturn } from './image-uploader.types';
import { SetStateAction } from 'react';
import { EmptyNoReturnFn } from '@common/utils';
import { FileError, DropzoneState } from 'react-dropzone';
import { Dispatch } from 'react';
import { ORIENTATION_TO_ANGLE } from '../stores/ImageUploaderContext';

export type OrientationKey = keyof typeof ORIENTATION_TO_ANGLE;

export type ScaleImage = (dimensions: Dimensions, maxWidth: number, maxHeight: number) => Dimensions;

export type UseImageUploaderReturn = {
  file: File | null;
  error: FileError | null;
  getRootProps: DropzoneState['getRootProps'];
  getInputProps: DropzoneState['getInputProps'];
  isDragActive: DropzoneState['isDragActive'];
  preview: string | null;
  clearFile: EmptyNoReturnFn;
  originalDimensions: Dimensions;
  originalAspectRatio: number;
  scaleImage: ScaleImage;
  cropShape: 'round' | 'rect';
  setCropShape: Dispatch<SetStateAction<'round' | 'rect'>>;
  isUploaderLoading: boolean;
  toggleUploaderLoading: () => void;
  croppedImage: GetCroppedImageReturn | null;
  setCroppedImage: Dispatch<SetStateAction<GetCroppedImageReturn | null>>;
  hasAdditionalStep: boolean;
  shape: 'rect' | 'round';
};

export interface UseCreateUploaderContextProps {
  shape?: 'rect' | 'round';
  hasAdditionalStep?: boolean;
}
