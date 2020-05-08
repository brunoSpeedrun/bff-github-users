import { Module, HttpModule } from '@nestjs/common';
import { GithubService } from './github.service';
import { GithubResolver } from './github.resolver';

@Module({
  imports: [HttpModule],
  providers: [GithubService, GithubResolver],
})
export class GithubModule {}
