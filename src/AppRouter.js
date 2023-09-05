import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import HomePage from "@pages/homePage";
import RegisterPage from "@pages/registerPage";
import LoginPage from "@pages/loginPage";
import ArticleEditorPage from "@pages/articleEditorPage";
import Layout from "@shared/layout";
import { createBrowserHistory } from "history";
import ArticlePage from "@pages/articlePage";

// 创建 BrowserRouter 路由对象
export const history = createBrowserHistory();

export default class AppRouter extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/">
            <Layout>
              <Switch>
                <Route path="/" component={HomePage} exact />
                <Route path="/register" component={RegisterPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/article/:slug" component={ArticlePage} />
                <Route path="/editor/:slug" component={ArticleEditorPage} />
                <Route path="/editor" component={ArticleEditorPage} />
              </Switch>
            </Layout>
          </Route>
        </Switch>
      </Router>
    );
  }
}
