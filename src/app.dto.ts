import { IsEnum, IsString } from 'class-validator'

enum Theme {
  DEFAULT,
  COMPANY_INTRO,
  DROPLETON,
}

export class SetThemeBody {
  @IsEnum(Theme)
  theme: Theme
}

export class SetExpertBody {
  @IsString()
  name: string
}
