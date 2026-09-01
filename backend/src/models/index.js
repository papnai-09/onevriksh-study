import mongoose from 'mongoose';
import { createMemoryModel } from '../config/memoryStore.js';
import { User as MongooseUser } from './User.js';
import { Course as MongooseCourse } from './Course.js';
import { Enrollment as MongooseEnrollment } from './Enrollment.js';
import { Attendance as MongooseAttendance } from './Attendance.js';
import { Payment as MongoosePayment } from './Payment.js';
import { Notice as MongooseNotice } from './Notice.js';
import { StudyMaterial as MongooseStudyMaterial } from './StudyMaterial.js';
import { Test as MongooseTest } from './Test.js';
import { Result as MongooseResult } from './Result.js';
import { Certificate as MongooseCertificate } from './Certificate.js';
import { Lead as MongooseLead } from './Lead.js';

function createProxy(mongooseModel, collectionName) {
  const memoryModel = createMemoryModel(collectionName);
  return new Proxy(mongooseModel, {
    get(target, prop) {
      if (mongoose.connection.readyState === 1) {
        return target[prop];
      }
      if (prop in memoryModel) {
        return memoryModel[prop];
      }
      return target[prop];
    }
  });
}

export const User = createProxy(MongooseUser, 'users');
export const Course = createProxy(MongooseCourse, 'courses');
export const Enrollment = createProxy(MongooseEnrollment, 'enrollments');
export const Attendance = createProxy(MongooseAttendance, 'attendances');
export const Payment = createProxy(MongoosePayment, 'payments');
export const Notice = createProxy(MongooseNotice, 'notices');
export const StudyMaterial = createProxy(MongooseStudyMaterial, 'studyMaterials');
export const Test = createProxy(MongooseTest, 'tests');
export const Result = createProxy(MongooseResult, 'results');
export const Certificate = createProxy(MongooseCertificate, 'certificates');
export const Lead = createProxy(MongooseLead, 'leads');
