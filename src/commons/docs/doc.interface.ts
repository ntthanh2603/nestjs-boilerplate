import type { HttpStatus } from '@nestjs/common';
import type { ApiParamOptions, ApiQueryOptions } from '@nestjs/swagger';
import type { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import type { ClassConstructor } from 'class-transformer';

export interface IDocResponseOptions<T> {
  dataSchema?: SchemaObject;
  description?: string;
  extraModels?: ClassConstructor<T>[];
  httpStatus?: HttpStatus;
  messageExample?: string;
  serialization?: ClassConstructor<T>;
  isArray?: boolean;
}

export interface IDocErrorOptions {
  status: HttpStatus;
  message?: string;
  errorCode?: string | number;
}

export interface IDocOptions<T> {
  description?: string;
  response?: IDocResponseOptions<T>;
  request?: IDocRequestOptions;
  errors?: IDocErrorOptions[];
  summary?: string;
  operationId?: string;
}

interface IDocRequestOptions {
  params?: ApiParamOptions[];
  queries?: ApiQueryOptions[];
  bodyType?: 'FORM_DATA' | 'JSON';
}
