export class StudentDocument {

  docId = '';
  docName = '';
  docExists = false;
  forDomestic = false;
  forInternational = false;

  constructor(id: string, name: string, forDomestic: boolean, forInternational: boolean) {
    this.docId = id;
    this.docName = name;
    this.forDomestic = forDomestic;
    this.forInternational = forInternational;
  }
}
