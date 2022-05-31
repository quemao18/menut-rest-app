import { MaterialDashboardAngularPage } from './app.po';

describe('menu-app-rest App', () => {
  let page: MaterialDashboardAngularPage;

  beforeEach(() => {
    page = new MaterialDashboardAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
