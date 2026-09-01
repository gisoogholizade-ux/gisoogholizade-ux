package com.lifelingo.api.progress;

import com.lifelingo.api.user.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {
  private final ProgressRepository progress; private final UserRepository users;
  public ProgressController(ProgressRepository progress,UserRepository users){this.progress=progress;this.users=users;}
  public record ProgressView(int xp,int level,int completedMissions,int streak,int studyDays,long totalSeconds,int dailyDay,LocalDate lastStudyDate,LocalDate dailyCompletedDate){}
  public record MissionDone(int xp){}
  public record SessionTime(long seconds){}
  @GetMapping public ProgressView get(Authentication a){return view(current(a));}
  @PostMapping("/mission-complete") public ProgressView mission(@RequestBody(required=false) MissionDone body,Authentication a){Progress p=current(a);p.completeMission(LocalDate.now(),body==null?50:Math.max(0,body.xp()));return view(progress.save(p));}
  @PostMapping("/daily-complete") public ProgressView daily(Authentication a){Progress p=current(a);p.completeDaily(LocalDate.now());return view(progress.save(p));}
  @PostMapping("/session") public ProgressView session(@RequestBody SessionTime body,Authentication a){Progress p=current(a);p.addSessionSeconds(body.seconds());return view(progress.save(p));}
  private Progress current(Authentication a){Long id=Long.valueOf(a.getName());return progress.findByUserId(id).orElseGet(()->progress.save(new Progress(users.findById(id).orElseThrow(()->new ResponseStatusException(HttpStatus.UNAUTHORIZED)))));}
  private ProgressView view(Progress p){return new ProgressView(p.getXp(),p.getLevel(),p.getCompletedMissions(),p.getStreak(),p.getStudyDays(),p.getTotalSeconds(),p.getDailyDay(),p.getLastStudyDate(),p.getDailyCompletedDate());}
}
