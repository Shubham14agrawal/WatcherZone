import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { HttpClientModule } from '@angular/common/http';


describe('Product Service', () => {

  let service: ProductService;

  beforeEach(() => { TestBed.configureTestingModule({imports:[HttpClientModule]});
  service = TestBed.inject(ProductService);
});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return list of products ', (done: any) => {
    service.getProducts().subscribe(data => {
      expect(data.length).toBeGreaterThan(0);
      done();
    });
  });

  it('should return single product ', (done: any) => {
    var productId = "1";
    service.getProduct(productId).subscribe(data => {
      expect(data).toBeDefined();
      done();
    });
  });

  it('should not return product in case of invalid id ', (done: any) => {
    var productId = "-1";
    service.getProduct(productId).subscribe(data => {
      expect(data).toBeUndefined();
      done();
    });
  });

  it('should have price defined in case of valid id ', (done: any) => {
    var productId = "1";
    service.getProduct(productId).subscribe(data => {
      expect(data.name).toBeDefined();
      done();
    });
  });

  it('should have color defined in case of valid id ', (done: any) => {
    var productId = "1";
    service.getProduct(productId).subscribe(data => {
      expect(data.title).toBeDefined();
      done();
    });
  });

  it('should have brand defined in case of valid id ', (done: any) => {
    var productId = "1";
    service.getProduct(productId).subscribe(data => {
      expect(data.genre).toBeDefined();
      done();
    });
  });
});
